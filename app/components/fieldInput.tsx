"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Attachment01, Send03, X, ImageIndentLeft, File06, VideoRecorder } from "@untitledui/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import sendConversationData from "../data/sendConversationData";
import { Conversation } from "../data/interface/conversation";

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

// ─── Chat Bubble ──────────────────────────────────────────────────────────────

const ChatBubble = ({ msg }: { msg: Conversation }) => {
    const isUser = msg.role === "user";
    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            {!isUser && (
                <div className="mr-2.5 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e676] to-[#00a152] text-[10px] font-bold text-[#061008]">
                    AI
                </div>
            )}
            <div
                className={[
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed",
                    isUser
                        ? "rounded-br-sm bg-[#00e676]/10 text-gray-100 ring-1 ring-[#00e676]/20"
                        : "rounded-bl-sm bg-[#0c1a0f] text-gray-200 ring-1 ring-white/[0.07]",
                ].join(" ")}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Heading
                            h1: ({ children }) => <h1 className="mb-2 text-base font-bold text-gray-100">{children}</h1>,
                            h2: ({ children }) => <h2 className="mb-1.5 text-[15px] font-bold text-gray-100">{children}</h2>,
                            h3: ({ children }) => <h3 className="mb-1 text-[14px] font-semibold text-gray-200">{children}</h3>,
                            // Paragraph
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            // Bold & Italic
                            strong: ({ children }) => <strong className="font-semibold text-gray-100">{children}</strong>,
                            em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                            // Unordered list
                            ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 text-gray-300">{children}</ul>,
                            // Ordered list
                            ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 text-gray-300">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            // Code inline
                            code: ({ children }) => (
                                <code className="rounded bg-[#071209] px-1.5 py-0.5 font-mono text-[12.5px] text-[#00e676]">
                                    {children}
                                </code>
                            ),
                            // Code block
                            pre: ({ children }) => (
                                <pre className="mb-2 overflow-x-auto rounded-xl bg-[#071209] px-4 py-3 font-mono text-[12.5px] text-[#00e676] ring-1 ring-white/[0.05]">
                                    {children}
                                </pre>
                            ),
                            // Horizontal rule
                            hr: () => <hr className="my-2 border-white/10" />,
                            // Blockquote
                            blockquote: ({ children }) => (
                                <blockquote className="mb-2 border-l-2 border-[#00e676]/40 pl-3 text-gray-400 italic">
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};

// ─── Typing Indicator ─────────────────────────────────────────────────────────

const TypingIndicator = () => (
    <div className="flex items-end gap-2.5 mb-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e676] to-[#00a152] text-[10px] font-bold text-[#061008]">
            AI
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-[#0c1a0f] px-4 py-3 ring-1 ring-white/[0.07]">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00e676]/70 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00e676]/70 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00e676]/70 [animation-delay:300ms]" />
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const InputArea = () => {
    // Satu state untuk isi textarea (menggabungkan `value` dan `inputText` lama)
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<AttachedFile[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Riwayat percakapan — dipakai sekaligus oleh UI dan API
    const [conversation, setConversation] = useState<Conversation[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // ── Auto-scroll ke pesan terbaru ──────────────────────────────────────────
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, isLoading]);

    // ── Auto-resize textarea hingga 200px ─────────────────────────────────────
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }, [value]);

    // ── Handle file input ─────────────────────────────────────────────────────
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

    // ── Kirim pesan — terhubung ke handleSendConversation + UI ────────────────
    const handleSendConversation = useCallback(async () => {
        const trimmed = value.trim();
        if (!trimmed && attachments.length === 0) return;
        if (isLoading) return;

        setError(null);

        const newMessage: Conversation = {
            role: "user",
            text: trimmed,
        };

        const updatedConversation = [...conversation, newMessage];

        // Tampilkan pesan user ke UI seketika & kosongkan input
        setConversation(updatedConversation);
        setValue("");
        setAttachments([]);
        setIsLoading(true);

        try {
            const result = await sendConversationData(updatedConversation);

            // Simpan balasan AI ke riwayat percakapan
            // Format respons backend: { success: true, result: "teks balasan..." }
            const aiReply: Conversation = {
                role: "model",
                text: result?.result
                    ?? result?.text
                    ?? result?.reply
                    ?? result?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?? "Maaf, tidak ada respons dari AI.",
            };
            setConversation((prev) => [...prev, aiReply]);
        } catch (err) {
            console.error(err);
            setError("Gagal terhubung ke server. Coba lagi.");
        } finally {
            setIsLoading(false);
        }
    }, [value, attachments, conversation, isLoading]);

    // ── Enter untuk kirim, Shift+Enter untuk baris baru ───────────────────────
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendConversation();
        }
    };

    const canSend = (value.trim().length > 0 || attachments.length > 0) && !isLoading;

    return (
        <div className="mx-auto flex w-full max-w-[760px] flex-col">

            {/* ── Area percakapan ────────────────────────────────────────── */}
            {conversation.length > 0 && (
                <div className="mb-4 max-h-[60vh] overflow-y-auto px-1 pr-2 [scrollbar-width:thin] [scrollbar-color:#1a2e1d_transparent]">
                    {conversation.map((msg, i) => (
                        <ChatBubble key={i} msg={msg} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={chatEndRef} />
                </div>
            )}

            {/* ── Pesan error ────────────────────────────────────────────── */}
            {error && (
                <p className="mb-2 rounded-xl bg-red-500/10 px-4 py-2 text-center text-[13px] text-red-400 ring-1 ring-red-500/20">
                    {error}
                </p>
            )}

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
                    disabled={isLoading}
                    className="min-h-6 w-full resize-none overflow-y-auto border-none bg-transparent text-[14.5px] leading-relaxed text-gray-100 outline-none placeholder:text-gray-600 disabled:opacity-50 [font-family:inherit] [max-height:200px]"
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
                                disabled={isLoading}
                                className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border-0 bg-transparent text-gray-500 transition-colors duration-150 hover:bg-[#00e676]/10 hover:text-[#00e676] disabled:cursor-not-allowed disabled:opacity-40"
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
                        onClick={handleSendConversation}
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