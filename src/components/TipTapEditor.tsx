import { cn } from "@/lib/utils";
import {
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListOrdered,
  LogsIcon,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Separator } from "./ui/separator";
import { forwardRef } from "react";

interface TipTapEditorProps {
  name?: string;
  className?: string;
  placeholder?: string;
  description?: string;
  onChange: (richText: string) => void;
}

const TipTapEditor = forwardRef<HTMLDivElement, TipTapEditorProps>(
  (props, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          // Use different placeholders depending on the node type:
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "What's the title?";
            }

            return props.placeholder || "Write something...";
          },
          emptyEditorClass: "is-editor-empty",
          showOnlyWhenEditable: false,
        }),
      ],

      content: props.description || "",
      onUpdate: ({ editor }) => {
        props.onChange(editor.getHTML());
      },
    });

    if (!editor) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-stretch min-h-36 relative z-20 w-full rounded-md overflow-hidden",
          props.className
        )}
      >
        <EditorContent
          editor={editor}
          className="rounded-md w-full bg-background p-4 tip-tap-editor focus:ring-0"
          name={props.name}
        />

        <FloatingMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
          }}
          className="border border-input bg-white shadow-md rounded-md overflow-hidden max-w-sm mb-20 z-0"
        >
          <TipTapMenu editor={editor} />
        </FloatingMenu>

        <BubbleMenu
          editor={editor}
          className="border border-input bg-white shadow-md rounded-md overflow-hidden max-w-sm mb-2 z-0"
        >
          <TipTapMenu editor={editor} />
        </BubbleMenu>
      </div>
    );
  }
);

export default TipTapEditor;

const TipTapMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-[2px] p-1 w-full overflow-x-auto">
      <Toggle
        size={"sm"}
        title="Heading 1"
        onPressedChange={() =>
          editor.chain().focus().setHeading({ level: 1 }).run()
        }
        pressed={editor.isActive("heading", { level: 1 })}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("heading", {
            level: 1,
          }),
        })}
      >
        <Heading1 className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() =>
          editor.chain().focus().setHeading({ level: 2 }).run()
        }
        pressed={editor.isActive("heading", { level: 2 })}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("heading", {
            level: 2,
          }),
        })}
      >
        <Heading2 className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() =>
          editor.chain().focus().setHeading({ level: 3 }).run()
        }
        pressed={editor.isActive("heading", { level: 3 })}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("heading", {
            level: 3,
          }),
        })}
      >
        <Heading3 className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().setBold().run()}
        pressed={editor.isActive("bold")}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("bold"),
        })}
      >
        <BoldIcon className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().setItalic().run()}
        pressed={editor.isActive("italic")}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("italic"),
        })}
      >
        <ItalicIcon className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().setStrike().run()}
        pressed={editor.isActive("strike")}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("strike"),
        })}
      >
        <Strikethrough className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive("orderedList")}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("orderedList"),
        })}
      >
        <ListOrdered className="h-4 w-4" strokeWidth={2} />
      </Toggle>

      <Separator orientation="vertical" className="h-6" />

      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive("bulletList")}
        className={cn("text-zinc-500", {
          "text-primary bg-zinc-500": editor.isActive("bulletList"),
        })}
      >
        <LogsIcon className="h-4 w-4" strokeWidth={2} />
      </Toggle>
    </div>
  );
};
