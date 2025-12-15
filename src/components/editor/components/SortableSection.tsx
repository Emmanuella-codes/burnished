import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableSection({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled?: boolean;
  children:  (props: { attributes: any; listeners: any }) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
}
