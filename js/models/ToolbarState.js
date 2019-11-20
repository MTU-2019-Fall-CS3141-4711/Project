var ToolbarState = {
    POINTER:1,
    BRUSH: 2,
    ERASER: 3,
    COLOR: 4,
    COLORHEX: 0x00,
    getTool: () => { return ToolbarState.currentTool; },
    setTool: (tool) => { ToolbarState.currentTool = tool; },
    setColor: (tool) => {ToolbarState.COLORHEX = tool;},
    construct: () => {
        ToolbarState.currentTool = ToolbarState.POINTER;
    }
}

module.exports = ToolbarState;