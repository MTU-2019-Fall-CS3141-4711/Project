var ToolbarState = {
    POINTER:1,
    BRUSH: 2,
    ERASER: 3,
    COLOR: 4,
    CURRENTCOLOR: "#000",
    getTool: () => { return ToolbarState.currentTool; },
    setTool: (tool) => { ToolbarState.currentTool = tool; },
    construct: () => {
        ToolbarState.currentTool = ToolbarState.POINTER;
    }
}

module.exports = ToolbarState;