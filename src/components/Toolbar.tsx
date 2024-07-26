interface ToolbarProps {
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
  onToggleErase: () => void;
  isErasing: boolean;
}

export const Toolbar = ({ onColorChange, onBrushSizeChange, onClear, onToggleErase, isErasing }: ToolbarProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
      <input type="color" onChange={(e) => onColorChange(e.target.value)} />
      <input
        type="range"
        min="1"
        max="50"
        defaultValue="5"
        onChange={(e) => onBrushSizeChange(Number(e.target.value))}
      />
      <button onClick={onClear}>Clear</button>
      <button onClick={onToggleErase}>{isErasing ? 'Draw' : 'Erase'}</button>
    </div>
  );
};
