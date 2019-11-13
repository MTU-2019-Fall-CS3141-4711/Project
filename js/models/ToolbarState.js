var ToolbarState = {
    POINTER:1,
    BRUSH: 2,
    ERASER: 3,
    getTool: () => { return ToolbarState.currentTool; },
    setTool: (tool) => { ToolbarState.currentTool = tool; },
    construct: () => {
        ToolbarState.currentTool = ToolbarState.POINTER;
    }
}

module.exports = ToolbarState;