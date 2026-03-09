export function formatPhone(value?: string) {
    const v = (value ?? "").trim();
    if (!v) return "";
    return v.startsWith("+") ? v : `+${v}`;
}
