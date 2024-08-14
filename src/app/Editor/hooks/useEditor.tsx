import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaPlusCircle } from "react-icons/fa";
import { jsonMOCK2, jsonMOCK } from "../mocks";
import {
  extractKeyValue,
  findPropertyPath,
  onCreateIconContainer,
} from "../helpers";

const useEditorLogic = () => {
  const [alert, setAlert] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [value, setValue] = useState(jsonMOCK2);
  const [iconContainer, setIconContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [clickPosition, setClickPosition] = useState<{ row: number }>({
    row: 0,
  });

  const [iconPosition, setIconPosition] = useState({
    top: 0,
    row: 0,
    visible: false,
  });

  const editorRef = useRef<any>(null);

  const onRemovePreviousIcon = (editor: any) => {
    if (iconContainer && editor.container.contains(iconContainer)) {
      ReactDOM.unmountComponentAtNode(iconContainer);
      editor.container.removeChild(iconContainer);
    }
  };

  const onCalcIconPosition = (editor: any, position: { row: number }) => {
    const lineHeight = editor.renderer.lineHeight;
    const charWidth = editor.renderer.characterWidth;
    const padding = 5;

    const top = position.row * lineHeight - editor.renderer.scrollTop;
    const lastColumn = editor.session.getLine(position.row).length;
    const left = lastColumn * charWidth + padding - editor.renderer.scrollLeft;

    return { top, left };
  };

  const onRenderIcon = (
    updatedIconContainer: HTMLDivElement,
    position: { row: number },
    lineContent: string
  ) => {
    const charactersToValidate = ["{", "}", "[", "]"];
    const valueHasCharacters = charactersToValidate.some((charactere) =>
      lineContent.includes(charactere)
    );

    if (!valueHasCharacters) {
      ReactDOM.render(
        <FaPlusCircle size={16} cursor={"pointer"} />,
        updatedIconContainer
      );
      setIconContainer(updatedIconContainer);
      setClickPosition(position);
    }
  };

  const onLineClick = (editor: any, position: { row: number }) => {
    setAlert({ open: false, message: "" });
    return editor.session.getLine(position.row);
  };

  const handleButtonOnScreen = (editor: any, position: { row: number }) => {
    if (iconContainer) {
      onRemovePreviousIcon(editor);
    }

    const updatedIconContainer = onCreateIconContainer();
    const calcPosition = onCalcIconPosition(editor, position);
    updatedIconContainer.style.top = `${calcPosition.top}px`;
    updatedIconContainer.style.left = `${calcPosition.left}px`;

    editor.container.appendChild(updatedIconContainer);
    const lineContent = onLineClick(editor, position);
    onRenderIcon(updatedIconContainer, position, lineContent);
  };

  const onIconClick = async () => {
    if (!clickPosition) return;
    const editor = editorRef.current?.editor;
    if (!editor) return;
    const propertySelected = onLineClick(editor, clickPosition);
    const trimmedString = propertySelected
      .trim()
      .replace(/,$/, "")
      .replace(/["]/g, "");
    const [property, propertyValue] = extractKeyValue(trimmedString);
    const json = JSON.parse(value);
    if (property && propertyValue) {
      const path = findPropertyPath(json, { property, propertyValue });
      if (path) {
        await navigator.clipboard.writeText(path);
        setAlert({ open: true, message: path });
      }
    }
  };

  function debounce(func: Function, wait: number) {
    let timeout: any;
    return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    const handleMouseClick = (e: MouseEvent) => {
      const position = editor.renderer.screenToTextCoordinates(
        e.clientX,
        e.clientY
      );
      const cursorPosition = editor.getSession().getSelection().getCursor();
      const lineHeight = editor.renderer.lineHeight;
      const topPosition = cursorPosition.row * lineHeight;

      setIconPosition({
        top: topPosition,
        visible: true,
        row: cursorPosition.row,
      });

      handleButtonOnScreen(editor, position);
    };

    const handleScroll = debounce(() => {
      const position = { row: iconPosition.row };
      const calcPosition = onCalcIconPosition(editor, position);

      if (iconContainer) {
        iconContainer.style.top = `${calcPosition.top}px`;
        iconContainer.style.left = `${calcPosition.left}px`;
      }
    }, 50);

    editor.container.addEventListener("click", handleMouseClick);
    editor.renderer.scrollBarV.element.addEventListener("scroll", handleScroll);

    if (iconContainer) {
      iconContainer.addEventListener("click", onIconClick);
    }

    editor.session.on("change", () => {
      setValue(editor.getValue());
    });

    return () => {
      editor.container.removeEventListener("click", handleMouseClick);
      editor.renderer.scrollBarV.element.removeEventListener(
        "scroll",
        handleScroll
      );
      if (iconContainer) {
        iconContainer.removeEventListener("click", onIconClick);
      }
      editor.session.off("change");
    };
  }, [iconContainer, clickPosition, iconPosition]);

  return {
    value,
    alert,
    setAlert,
    editorRef,
    onIconClick,
    iconPosition,
  };
};

export default useEditorLogic;
