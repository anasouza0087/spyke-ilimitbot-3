"use client";

import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

import { Alert, Snackbar } from "@mui/material";
import useEditorLogic from "./hooks/useEditor";

export const Editor = () => {
  const { alert, setAlert, editorRef, value } = useEditorLogic();

  return (
    <div style={{ position: "relative", width: "100%", height: 800 }}>
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="editor"
        editorProps={{ $blockScrolling: true }}
        ref={editorRef}
        value={value}
        style={{ width: "100%", height: "100%" }}
      />

      {alert.open && (
        <Snackbar
          open={alert.open}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => {
              setAlert({ open: false, message: "" });
            }}
          >
            O caminho relativo {alert?.message} foi copiado com sucesso!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Editor;
