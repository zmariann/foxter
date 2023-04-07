import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/fluent-light/theme.css";
let setVisibleOutSide: Function | undefined = undefined;
let setDataOutside: Function | undefined = undefined;

const ConfirmDialog = () => {
  const [data, setData] = useState({
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
      header="Delete a room"
      visible={visible}
      style={{ width: "20vw" }}
      onHide={() => setVisible(false)}
      dismissableMask
    >
      <p className="m-0">
        Are you sure you want to delete{" "}
        <span className="text-greenFox"> {data.content}</span>?{" "}
      </p>
      <div className="flex justify-end">
        <div>
          <button
            className="text-sm font-medium bg-stone-500 text-whiteFox rounded-full text-center py-[6px] px-[30px] mt-2"
            onClick={() => {
              data.onYes();
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
