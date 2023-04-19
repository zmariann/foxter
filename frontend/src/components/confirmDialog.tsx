import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/fluent-light/theme.css";
let setVisibleOutSide: Function | undefined = undefined;
let setDataOutside: Function | undefined = undefined;

const ConfirmDialog = () => {
  const [data, setData] = useState({
    type: "",
    content: "",
    onYes: () => {},
    onNo: () => {},
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisibleOutSide = setVisible;
    setDataOutside = setData;
    return () => {
      setVisibleOutSide = undefined;
      setDataOutside = undefined;
    };
  });

  return (
    <Dialog
      className="flex justify-center"
      header="Complete request"
      visible={visible}
      style={{ width: "20vw" }}
      onHide={() => setVisible(false)}
      dismissableMask
    >
      <p className="m-0">
        {data.type === "thisMessage" && (
          <span>Are you sure you want to delete this message?</span>
        )}
        {data.type === "deleteRoom" && (
          <div>
            <span>Are you sure you want to delete </span>{" "}
            <span className="text-greenFox">{data.content}?</span>
          </div>
        )}
        {data.type === "invitationAccept" && (
          <div>
            <span>Are you sure you want to accept invitation to</span>
            <span className="text-greenFox"> {data.content}</span>
            <span>?</span>
          </div>
        )}
        {data.type === "invitationDelete" && (
          <div>
            <span>Are you sure you want to delete invitation to </span>
            <span className="text-greenFox"> {data.content}</span>
            <span>?</span>
          </div>
        )}
        {data.type === "sendInvitation" && (
          <div>
            <span>Are you sure you want to send this invitation to </span>
            <span className="text-greenFox"> {data.content}</span>
            <span>?</span>
          </div>
        )}
      </p>

      <div className="flex justify-end">
        <div>
          <button
            className="text-sm font-medium bg-stone-500 text-whiteFox rounded-full text-center py-[6px] px-[30px] mt-2"
            onClick={() => {
              data.onYes();
              setVisible(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
};

function showDialog(data: {
  type: string;
  content: string;
  onYes: Function;
  onNo: Function;
}) {
  if (setVisibleOutSide !== undefined) {
    setVisibleOutSide(true);
  }
  if (setDataOutside !== undefined) {
    setDataOutside(data);
  }
}
export { ConfirmDialog, showDialog };
