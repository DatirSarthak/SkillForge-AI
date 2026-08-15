import { useMemo, useState } from "react";
import {
    MessageSquarePlus,
    MessageCircle,
    Edit3,
    Trash2,
    Check,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SidebarSkeleton from "./SidebarSkeleton";

const ChatSidebar = ({
    sidebarOpen,
    setSidebarOpen,

    conversations = [],

    selectedConversation,

    onSelectConversation,
    onRenameConversation,
    onDeleteConversation,
    onNewChat,

    searchTerm,
    setSearchTerm,
}) => {
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [renamingId, setRenamingId] = useState(null);

    const filteredConversations = useMemo(() => {
        if (!searchTerm.trim()) return conversations;

        const query = searchTerm.toLowerCase();

        return conversations.filter((conversation) =>
            conversation.title.toLowerCase().includes(query)
        );
    }, [conversations, searchTerm]);

    const startEditing = (conversation) => {
        setEditingId(conversation.id);
        setEditedTitle(conversation.title);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditedTitle("");
    };

    const saveEditing = async () => {
        const title = editedTitle.trim();

        if (!editingId) return;

        const currentConversation = conversations.find(
            (conversation) => conversation.id === editingId
        );

        if (!title || currentConversation?.title === title) {
            cancelEditing();
            return;
        }

        try {
            setRenamingId(editingId);
            await onRenameConversation(editingId, title);
        } finally {
            setRenamingId(null);
            cancelEditing();
        }
    };

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await saveEditing();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            cancelEditing();
        }
    };

    const handleConversationClick = (conversationId) => {
        if (editingId) return;

        onSelectConversation(conversationId);
        setSidebarOpen(false);
    };

    const handleNewChat = () => {
        onNewChat();
        setSidebarOpen(false);
    };

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          w-[330px]
          flex-col
          border-r
          border-slate-700
          bg-gradient-to-b
          from-slate-900
          via-slate-900
          to-slate-950
          backdrop-blur-xl
          text-white
          transition-transform
          duration-300
          lg:static
          lg:translate-x-0
          ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
        `}
            >
                <div className="mx-3 my-3 rounded-2xl border border-slate-800 p-4">
                    <button
                        onClick={handleNewChat}
                        className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
via-indigo-600
to-violet-600
py-3
font-medium
shadow-md
transition-all
duration-300
hover:scale-[1.02]
hover:shadow-xl
"
                    >
                        <MessageSquarePlus size={18} />
                        New Chat
                    </button>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search conversations..."
                        className="
mt-4
w-full
rounded-xl
border
border-slate-600
bg-slate-800
px-4
py-3
text-sm
text-white
placeholder:text-slate-400
outline-none
transition-all
focus:border-blue-500
focus:ring-2
focus:ring-blue-500/30
"
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations === null ? (
                        <SidebarSkeleton />
                    ) : filteredConversations.length === 0 ? (
                        <div className="p-6 text-center text-sm text-slate-400">
                            No conversations found
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredConversations.map((conversation) => {
                                const isEditing = editingId === conversation.id;
                                const isSelected =
                                    selectedConversation?.id === conversation.id;
                                const isRenaming = renamingId === conversation.id;

                                return (
                                    <motion.div
                                        key={conversation.id}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -15 }}
                                        transition={{ duration: 0.18 }}
                                        onClick={() =>
                                            handleConversationClick(conversation.id)
                                        }
                                        className={`
                      group
mx-2
my-1
flex
cursor-pointer
items-center
justify-between
gap-3
rounded-xl
px-4
py-3
transition-all
duration-200
                      ${isSelected
                                                ? "bg-blue-600/20 border border-blue-500 shadow-md"
                                                : "hover:bg-slate-800 hover:translate-x-1 hover:shadow hover:shadow-md hover:scale-[1.01]"
                                            }
                    `}
                                    >
                                        <div className="flex min-w-0 flex-1 items-center gap-3">
                                            <MessageCircle
size={18}
className="
shrink-0
text-blue-400
transition
group-hover:scale-110
"
/>

                                            {isEditing ? (
                                                <input
                                                    autoFocus
                                                    value={editedTitle}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) =>
                                                        setEditedTitle(e.target.value)
                                                    }
                                                    onKeyDown={handleKeyDown}
                                                    className="w-full rounded-md bg-slate-700 px-2 py-1 text-sm outline-none ring-1 ring-transparent focus:ring-blue-500"
                                                />
                                            ) : (
                                                <span className="truncate text-sm font-medium text-slate-200">
                                                    {conversation.title}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className="flex items-center gap-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={saveEditing}
                                                        disabled={isRenaming}
                                                        className="rounded p-1 transition hover:bg-gradient-to-r
from-blue-600/20
to-indigo-600/20 hover:scale-110 disabled:opacity-50"
                                                    >
                                                        {isRenaming ? (
                                                            <span className="text-xs text-slate-300">
                                                                ...
                                                            </span>
                                                        ) : (
                                                            <Check
                                                                size={18}
                                                                className="text-green-400"
                                                            />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={cancelEditing}
                                                        disabled={isRenaming}
                                                        className="rounded p-1 transition hover:bg-blue-700 hover:text-blue-400 disabled:opacity-50"
                                                    >
                                                        <X
                                                            size={18}
                                                            className="text-slate-400"
                                                        />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startEditing(conversation);
                                                        }}
                                                        className="rounded p-1 transition hover:bg-slate-700"
                                                    >
                                                        <Edit3
                                                            size={17}
                                                            className="text-blue-400"
                                                        />
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteConversation(conversation.id);
                                                        }}
                                                        className="rounded p-1 transition hover:bg-red-500/20  hover:scale-110"
                                                    >
                                                        <Trash2
                                                            size={17}
                                                            className="text-red-400"
                                                        />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </aside>
        </>
    );
};

export default ChatSidebar;