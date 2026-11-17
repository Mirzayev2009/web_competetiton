import { getTool, isToolId, type ToolId } from "@/lib/tools";

export type RentalRequest = {
  id: string;
  name: string;
  toolId: ToolId;
  days: number;
  createdAt: string;
};

const STORAGE_KEY = "asbob-ijara-namuna-sorovlar-v1";
const CHANGE_EVENT = "asbob-ijara-sorovlar-yangilandi";
const LOADING = "__loading__";

function isRentalRequest(value: unknown): value is RentalRequest {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" && item.id.length > 0 &&
    typeof item.name === "string" && item.name.trim().length > 0 &&
    isToolId(item.toolId) &&
    typeof item.days === "number" && Number.isInteger(item.days) && item.days >= 1 && item.days <= 7 &&
    typeof item.createdAt === "string" && Number.isFinite(Date.parse(item.createdAt))
  );
}

export function parseRequests(raw: string | null): RentalRequest[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isRentalRequest) : [];
  } catch {
    return [];
  }
}

export function readRequests(): RentalRequest[] {
  try {
    return parseRequests(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveRequest(request: RentalRequest): boolean {
  if (!getTool(request.toolId) || !isRentalRequest(request)) return false;
  try {
    const current = readRequests();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([request, ...current]));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function subscribeRequests(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function getRequestsSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function getServerRequestsSnapshot(): string {
  return LOADING;
}

export function requestsFromSnapshot(snapshot: string): RentalRequest[] | null {
  return snapshot === LOADING ? null : parseRequests(snapshot);
}
