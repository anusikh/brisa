function isAnAction(
  action: unknown,
): action is { actionId: string; actions?: unknown[] } {
  return typeof action === "function" && "actionId" in action;
}

export default isAnAction;