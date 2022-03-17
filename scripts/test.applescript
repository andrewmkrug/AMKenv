


tell application "System Events"

    set listOfProcesses to (name of every process where background only is false)
end tell

log listOfProcesses

log "Windows"

tell application "System Events"

    set listOfWindows to (name of every window )
end tell

log listOfWindows


