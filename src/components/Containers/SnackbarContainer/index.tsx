"use client";
// System
import { useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
// Ui
import Snackbar from "@/ui/Navigation/Snackbar";
// Store
import { useStore } from "@/store";
// Styles and types
import styles from "./styles.module.scss";

/**
 * Container for displaying snackbars.
 */
export default function SnackbarContainer() {
  const listOfOpenSnackbar = useStore((state) => state.listOfOpenSnackbar);
  const closeSnackbar = useStore((state) => state.delayCloseSnackbar);

  const handleCloseModal = useCallback(
    (snackbarKey: string) => {
      if (listOfOpenSnackbar[snackbarKey]) {
        closeSnackbar(snackbarKey);
      }
    },
    [listOfOpenSnackbar, closeSnackbar],
  );

  const listOfSnackbars = useMemo(() => {
    return Object.entries(listOfOpenSnackbar).map(
      ([snackbarKey, snackbar], idx) => {
        const { message, type, duration, isClosing, title } = snackbar;
        const onClose = () => handleCloseModal(snackbarKey);
        return (
          <AnimatePresence key={snackbarKey} mode="wait">
            {!isClosing && (
              <Snackbar
                type={type}
                title={title}
                duration={duration ? duration * 1000 : undefined}
                onClose={onClose}
                closable={type !== "critical"}
                isFirst={
                  idx === 0 && Object.entries(listOfOpenSnackbar).length <= 1
                }
              >
                {message} + + {snackbarKey}
              </Snackbar>
            )}
          </AnimatePresence>
        );
      },
    );
  }, [listOfOpenSnackbar, handleCloseModal]);

  return <div className={styles["snackbar-container"]}>{listOfSnackbars}</div>;
}
