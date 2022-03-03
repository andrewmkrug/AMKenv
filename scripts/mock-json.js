// Name: JSON Tools
// Author: Andrew M Krug
// Description: A toolkit for managing your JSON
// Twitter: @andrewmkrug
// base-img: /assets/image2vector.svg
// img: /Users/andrewmkrug/.kenv/assets/image2vector.svg

import "@johnlindquist/kit";
const Ajv = await npm("ajv");
const jju = await npm("jju");
const jsf = await npm("json-schema-faker");
const faker = await npm("faker");
jsf.extend("faker", () => faker);

const ajv = new Ajv();
let { schemas, write } = await db({ schemas: [] });

// onTab("Create Data", async () => { })
onTab("Upload Schema", async () => {
  let name = await arg("Name of Schema");
  let newSchema = await path({
    startPath: "~",
    hint: "Set a path for the schema"
  });
  let schema = await readJson(newSchema);
  log(schema);
  schemas.push({ name, id: uuid(), schema });
  await write();
  await setTab("Validate Schema");
});
onTab("Delete Schema", async () => {
  let schema = await arg(
    {
      placeholder: "Remove Schema",
      onNoChoices: () => {
        setPanel(md(`# No schemas to remove`));
      }
    },
    schemas
  );
  _.remove(schemas, ({ id }) => schema.id === id);
  await write();
});
onTab("Generate Schema", async () => {
  let schema = await arg(
    "Generate Schema",
    schemas.map((schema) => {
      log(schema);
      return {
        name: schema.name,
        preview: async () => setPreview(md(schema.schema)),
        id: schema.id,
        schema: schema.schema
      };
    })
  );
  log(schema.schema);
  let fakeJson = await jsf.resolve(schema.schema).then((json) => {
    return json;
  });
  log(fakeJson);
  //if (fakeJson) {
  //   await copy(fakeJson);
  await editor({ hint: "Check out your data", content: fakeJson });
  //}
});
onTab("Validate JSON", async () => {
  while (true) {
    let schema = await arg(
      {
        placeholder: "Select Schema"
      },
      schemas
    );

    log(schema["schema"]);

    let inputType = await arg(
      { placeholder: "How do you want to input the data" },
      [
        { name: "Select a file", value: "file" },
        { name: "Clipboard", value: "clipboard" },
        { name: "Manually", value: "manual" }
      ]
    );

    let input = "";
    log(typeof input);
    log(inputType);
    if (inputType == "file") {
      let file = await path({ hint: "Choose the file" });
      let contents = await readJson(file);
      input = contents;
    }
    if (inputType == "clipboard") {
      log("in clipboard");
      let con = await paste();
      log(con);
      input = con;
    }

    if (inputType == "manual") {
      input = await editor();
    }

    let data = jju.parse(input);

    let validate = ajv.compile(schema["schema"]);
    let valid = await validate(data);
    setPanel(md(`# ${valid ? "Valid" : "Invalid"}`));
    if (!valid) console.log(validate.errors);
    log(valid);
    if (valid) {
      let filename = await path({ hint: "Save the JSON" });
      await writeJson(filename, data);
    } else {
      await editor({ hint: "Edit the JSON", content: data });
    }
  }
  // let choice = await arg("What do you want to do?", [])
});
