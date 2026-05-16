"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Attachment01, Send03, X, ImageIndentLeft, File06, VideoRecorder } from "@untitledui/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type AttachedFile = {
    id: string;
    file: File;
    previewUrl?: string;
    type: "image" | "document" | "media";
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectType(file: File): AttachedFile["type"] {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/") || file.type.startsWith("audio/")) return "media";
    return "document";
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── File Type Icon ───────────────────────────────────────────────────────────

const FileTypeIcon = ({ type }: { type: AttachedFile["type"] }) => {
    if (type === "image")
        return <ImageIndentLeft size={14} className="shrink-0 text-[#00e676]" />;
    if (type === "media")
        return <VideoRecorder size={14} className="shrink-0 text-blue-400" />;
    return <File06 size={14} className="shrink-0 text-amber-400" />;
};

// ─── File Chip ────────────────────────────────────────────────────────────────

const FileChip = ({
    item,
    onRemove,
}: {
    item: AttachedFile;
    onRemove: (id: string) => void;
}) => (
    <div className="inline-flex max-w-[200px] items-center gap-1.5 rounded-xl border border-white/10 bg-[#0d1f11] px-2 py-1.5">
        {item.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={item.previewUrl}
                alt={item.file.name}
                className="h-7 w-7 shrink-0 rounded-md object-cover"
            />
        ) : (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#07120a]">
                <FileTypeIcon type={item.type} />
            </div>
        )}

        <div className="flex min-w-0 flex-col">
            <span className="max-w-[110px] truncate text-[11.5px] font-medium text-gray-200">
                {item.file.name}
            </span>
            <span className="text-[10px] text-gray-500">{formatBytes(item.file.size)}</span>
        </div>

        <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Hapus ${item.file.name}`}
            className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#1a2e1d] text-gray-400 transition-colors duration-150 hover:bg-red-500 hover:text-white"
        >
            <X size={10} />
        </button>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const InputArea = () => {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<AttachedFile[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textarea up to 200px
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }, [value]);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files ?? []);
            const newItems: AttachedFile[] = files.map((file) => {
                const type = detectType(file);
                const id = `${Date.now()}-${Math.random()}`;
                const previewUrl = type === "image" ? URL.createObjectURL(file) : undefined;
                return { id, file, previewUrl, type };
            });
            setAttachments((prev) => [...prev, ...newItems]);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        [],
    );

    const removeAttachment = useCallback((id: string) => {
        setAttachments((prev) => {
            const item = prev.find((a) => a.id === id);
            if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
            return prev.filter((a) => a.id !== id);
        });
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!value.trim() && attachments.length === 0) return;
        setIsLoading(true);
        // TODO: replace with your actual AI API call
        await new Promise((r) => setTimeout(r, 1500));
        setIsLoading(false);
        setValue("");
        setAttachments([]);
    }, [value, attachments]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const canSend = (value.trim().length > 0 || attachments.length > 0) && !isLoading;

    return (
        <div className="relative mx-auto w-full max-w-[760px]">

            {/* ── Input box ─────────────────────────────────────────────── */}
            <div
                className={[
                    "flex flex-col gap-2 rounded-[18px] bg-[#0c1a0f] px-4 pt-3 pb-2.5",
                    "border-[1.5px] shadow-[0_2px_24px_rgba(0,0,0,0.5)]",
                    "transition-all duration-200",
                    isFocused
                        ? "border-[#00e676]/50 shadow-[0_0_0_3px_rgba(0,230,118,0.08),0_2px_24px_rgba(0,0,0,0.5)]"
                        : "border-white/[0.07]",
                ].join(" ")}
            >
                {/* Attachment chips */}
                {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {attachments.map((item) => (
                            <FileChip key={item.id} item={item} onRemove={removeAttachment} />
                        ))}
                    </div>
                )}

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Tanyakan seputar Copywriting & Marketing…"
                    aria-label="Pesan"
                    className="min-h-6 w-full resize-none overflow-y-auto border-none bg-transparent text-[14.5px] leading-relaxed text-gray-100 outline-none placeholder:text-gray-600 [font-family:inherit] [max-height:200px]"
                />

                {/* ── Toolbar ───────────────────────────────────────────── */}
                <div className="flex items-center justify-between">

                    {/* Left: attach button */}
                    <div className="flex items-center gap-1">
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.csv,.zip"
                            className="hidden"
                            onChange={handleFileChange}
                            aria-label="Upload lampiran"
                        />

                        {/* Attach button + tooltip */}
                        <div className="group relative">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                aria-label="Lampirkan file"
                                className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-gray-500 transition-colors duration-150 hover:bg-[#00e676]/10 hover:text-[#00e676]"
                            >
                                <Attachment01 size={18} />
                            </button>

                            {/* Tooltip */}
                            <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#111b13] px-2 py-1 text-[11px] text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                Lampirkan file
                            </div>
                        </div>
                    </div>

                    {/* Right: send button */}
                    <button
                        type="button"
                        disabled={!canSend}
                        onClick={handleSubmit}
                        aria-label="Kirim pesan"
                        className={[
                            "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border-0",
                            "transition-all duration-200",
                            canSend
                                ? [
                                    "cursor-pointer bg-gradient-to-br from-[#00e676] to-[#00a152] text-[#061008]",
                                    "shadow-[0_2px_12px_rgba(0,230,118,0.45)]",
                                    "hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,230,118,0.65)]",
                                    "active:scale-95",
                                  ].join(" ")
                                : "cursor-not-allowed bg-[#131f15] text-gray-600 shadow-none",
                        ].join(" ")}
                    >
                        {/* Inner gloss overlay */}
                        {canSend && (
                            <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
                        )}

                        {isLoading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                        ) : (
                            <Send03 size={16} />
                        )}
                    </button>
                </div>
            </div>

            {/* Keyboard hint */}
            <p className="mt-2 text-center text-[11.5px] text-gray-700">
                Tekan <kbd className="font-mono">Enter</kbd> untuk kirim ·{" "}
                <kbd className="font-mono">Shift+Enter</kbd> untuk baris baru
            </p>
        </div>
    );
};