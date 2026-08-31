export function initCommandPalette(reducedMotionQuery) {
  const dialog = document.querySelector("#command-dialog");
  const trigger = document.querySelector(".command-trigger");
  const closeButton = dialog?.querySelector(".command-close");
  const input = dialog?.querySelector("#command-input");
  const commands = [
    ...(dialog?.querySelectorAll("[data-command-target]") ?? []),
  ];

  if (
    !(dialog instanceof HTMLDialogElement) ||
    !trigger ||
    !closeButton ||
    !input ||
    !commands.length
  ) {
    return;
  }

  let returnFocus = null;

  const visibleCommands = () =>
    commands.filter((command) => !command.closest("li").hidden);

  const filterCommands = () => {
    const query = input.value.trim().toLowerCase();

    commands.forEach((command) => {
      command.closest("li").hidden = !command.textContent
        .toLowerCase()
        .includes(query);
    });
  };

  const openDialog = () => {
    if (dialog.open) {
      input.focus();
      return;
    }

    returnFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add("command-open");
    input.focus();
  };

  const closeDialog = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  const activateCommand = (command) => {
    const destination = command?.dataset.commandTarget;

    if (!destination) {
      return;
    }

    closeDialog();

    if (destination.startsWith("#")) {
      window.history.pushState(null, "", destination);
      document.querySelector(destination)?.scrollIntoView({
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
        block: "start",
      });
    } else {
      window.open(destination, "_blank", "noopener,noreferrer");
    }
  };

  trigger.addEventListener("click", openDialog);
  closeButton.addEventListener("click", closeDialog);
  input.addEventListener("input", filterCommands);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      activateCommand(visibleCommands()[0]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      visibleCommands()[0]?.focus();
    }
  });

  commands.forEach((command) => {
    command.addEventListener("click", () => activateCommand(command));
    command.addEventListener("keydown", (event) => {
      const available = visibleCommands();
      const currentIndex = available.indexOf(command);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        available[(currentIndex + 1) % available.length]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        (available[currentIndex - 1] ?? input).focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        input.focus();
      }
    });
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = [
      ...dialog.querySelectorAll(
        'button:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), [href]:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])',
      ),
    ].filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("command-open");
    input.value = "";
    filterCommands();

    if (returnFocus instanceof HTMLElement && returnFocus.isConnected) {
      returnFocus.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openDialog();
    }
  });
}
