"use client";
import React, { useCallback, useMemo, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import * as Icons from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { green, mauve, mauveA, red } from "@radix-ui/colors";
import { styled } from "@stitches/react";

type ToastType = "success" | "error";

interface Toast {
  message: string;
  type: ToastType;
}

const NotificationContext = React.createContext<{
  success: (message: string) => void;
  error: (message: string) => void;
} | null>(null);

interface NotificationsProps {
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  children: React.ReactNode;
}

const Notifications: React.FC<NotificationsProps> = (props) => {
  const { position, children } = props;
  const [notifications, setNotifications] = useState<Map<string, Toast>>(
    new Map()
  );
  const isPositionedTop = position === "topLeft" || position === "topRight";

  const handleAddToast = useCallback((toast: Toast) => {
    setNotifications((prev) => {
      const newMap = new Map(prev);
      newMap.set(String(Date.now()), { ...toast });
      return newMap;
    });
  }, []);

  const handleRemoveToast = useCallback((key: string) => {
    setNotifications((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchSuccess = useCallback(
    (message: string) => handleAddToast({ message, type: "success" }),
    [handleAddToast]
  );

  const handleDispatchError = useCallback(
    (message: string) => handleAddToast({ message, type: "error" }),
    [handleAddToast]
  );

  return (
    <NotificationContext.Provider
      value={useMemo(
        () => ({
          success: handleDispatchSuccess,
          error: handleDispatchError,
        }),
        [handleDispatchSuccess, handleDispatchError]
      )}
    >
      <ToastPrimitive.Provider duration={7000}>
        {children}
        <AnimatePresence>
          {Array.from(notifications).map(([key, notification]) => {
            return (
              <ToastRoot
                onOpenChange={(open) => {
                  if (!open) handleRemoveToast(key);
                }}
                key={key}
                type={notification.type}
                asChild
                forceMount
              >
                <motion.li
                  initial={{
                    y: isPositionedTop ? -100 : 100,
                    scale: 0.6,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{
                    scale: 0.9,
                    opacity: 0,
                    transition: { duration: 0.15 },
                  }}
                  layout
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <ToastIconContainer aria-hidden type={notification.type}>
                      {notification.type === "success" ? (
                        <Icons.CheckIcon />
                      ) : (
                        <Icons.Cross2Icon />
                      )}
                    </ToastIconContainer>

                    <div>
                      <ToastTitle>{notification.message}</ToastTitle>
                    </div>
                  </div>
                  <ToastClose>
                    <Icons.Cross2Icon />
                  </ToastClose>
                </motion.li>
              </ToastRoot>
            );
          })}
        </AnimatePresence>

        <ToastViewport position={position} />
      </ToastPrimitive.Provider>
    </NotificationContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const ToastRoot = styled(ToastPrimitive.Root, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: mauve.mauve2,
  padding: "14px 18px",
  width: 300,
  borderRadius: 8,
  boxShadow: `0 2px 4px ${mauveA.mauveA10}, 0 10px 15px ${mauveA.mauveA1}`,
  outline: "none",
  variants: {
    type: {
      success: {
        backgroundColor: green.green1,
      },
      error: {
        backgroundColor: red.red1,
      },
    },
  },
  "&:focus-visible": {
    boxShadow: `0 0 0 3px ${mauveA.mauveA12}`,
  },
});

const ToastTitle = styled(ToastPrimitive.Description, {
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 14,
  marginBottom: 2,
});

const ToastDescription = styled(ToastPrimitive.Description, {
  color: mauve.mauve10,
  fontSize: 14,
});

const ToastIconContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "100%",
  variants: {
    type: {
      success: {
        color: green.green1,
        backgroundColor: green.green10,
      },
      error: {
        color: red.red1,
        backgroundColor: red.red10,
      },
    },
  },
});

const ToastClose = styled(ToastPrimitive.Close, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 24,
  width: 24,
  borderRadius: "100%",
  padding: 0,
  color: mauve.mauve12,
  boxShadow: `0 0 0 2px ${mauve.mauve6}`,
  "&:focus-visible": {
    boxShadow: `0 0 0 3px ${mauveA.mauveA12}`,
  },
});

const ToastViewport = styled(ToastPrimitive.Viewport, {
  position: "fixed",
  zIndex: 50,
  padding: 50,
  display: "flex",
  flexDirection: "column",
  gap: 15,
  outline: "none",
  variants: {
    position: {
      bottomRight: { bottom: 0, right: 0 },
      bottomLeft: { bottom: 0, left: 0 },
      topRight: { top: 0, right: 0, flexDirection: "column-reverse" },
      topLeft: { top: 0, left: 0, flexDirection: "column-reverse" },
    },
  },
});

/* -----------------------------------------------------------------------------------------------*/

function useNotification() {
  const context = React.useContext(NotificationContext);
  if (context) return context;
  throw new Error("useNotification must be used within Notifications");
}

/* -----------------------------------------------------------------------------------------------*/

export { Notifications, useNotification };
