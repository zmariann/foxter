interface FoxProps {
    id: number;
    content: string;
    created_at: Date;
    likes: number;
    foxes: Fox[];
    onAddFox: (content: string) => void;
    onDeleteFox: (id: number) => void;
  }
export {FoxProps}  