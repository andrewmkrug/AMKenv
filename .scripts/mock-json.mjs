// .kenv/kenvs/shared/scripts/mock-json.ts
import "@johnlindquist/kit";
var { convert } = await npm("json-to-json-schema");
var Ajv = await npm("ajv");
var jju = await npm("jju");
var jsf = await npm("json-schema-faker");
var ajv = new Ajv();
var { schemas, write } = await db({ schemas: [] });
onTab("Upload Schema", async () => {
  let name = await arg("Name of Schema");
  let newSchema = await path({ startPath: "~", hint: "Set a path for the schema" });
  let schema = await readJson(newSchema);
  log(schema);
  schemas.push({ name, id: uuid(), schema });
  await write();
  await setTab("Validate Schema");
});
onTab("Delete Schema", async () => {
  let schema = await arg({
    placeholder: "Remove Schema",
    onNoChoices: () => {
      setPanel(md(`# No schemas to remove`));
    }
  }, schemas);
  _.remove(schemas, ({ id }) => schema.id === id);
  await write();
});
onTab("Generate Schema", async () => {
  let schema = await arg("Generate Schema", schemas.map((schema2) => {
    log(schema2);
    return {
      name: schema2.name,
      preview: async () => setPreview(md(schema2.schema)),
      id: schema2.id,
      schema: schema2.schema
    };
  }));
  log(schema);
  let fakeJson = jsf.resolve(schema);
  log(fakeJson);
  await editor(fakeJson);
});
onTab("Validate JSON", async () => {
  while (true) {
    let schema = await arg({
      placeholder: "Select Schema"
    }, schemas);
    log(schema["schema"]);
    let inputType = await arg({ placeholder: "How do you want to input the data" }, [
      { name: "Select a file", value: "file" },
      { name: "Clipboard", value: "clipboard" },
      { name: "Manually", value: "manual" }
    ]);
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
    if (!valid)
      console.log(validate.errors);
    log(valid);
    if (valid) {
      let filename = await path({ hint: "Save the JSON" });
      await writeJson(filename, data);
    } else {
      await editor({ hint: "Edit the JSON", content: data });
    }
  }
});
