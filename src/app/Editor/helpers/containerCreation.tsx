export const onCreateIconContainer = (): HTMLDivElement => {
  const newIconContainer = document.createElement("div");
  newIconContainer.style.position = "absolute";
  newIconContainer.style.display = "flex";
  newIconContainer.style.justifyContent = "flex-end";
  newIconContainer.style.alignItems = "center";
  newIconContainer.style.width = "60%";
  newIconContainer.style.zIndex = "1000";

  return newIconContainer;
};
