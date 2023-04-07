import { toastStore } from "@/store/toastStore";
import ToastStoreInterface from "@/store/toastStore.interface";
import { shallow } from "zustand/shallow";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ content }: { content: string }) {
  const { show, setShow } = toastStore(
    (state) => ({
      show: (state as ToastStoreInterface).show,
      setShow: (state as ToastStoreInterface).setShow,
    }),
    shallow
  );

  return (
    <AnimatePresence>
      {show && <motion.div
        initial={{ opacity: 0, top: "-10%" }}
        animate={{ opacity: 1, top: "5%" }}
        exit={{ opacity: 0, top: "-10%" }}
        transition={{ duration: 0.25 }}
        className="flex p-4 rounded bg-red-500 w-[80%] lg:w-[25rem] absolute left-[50%] translate-x-[-50%] items-center justify-between"
      >
        <p>{content}</p>
        <button className="text-2xl" onClick={() => setShow(false)}>
          ×
        </button>
      </motion.div>}
    </AnimatePresence>
  );
}
