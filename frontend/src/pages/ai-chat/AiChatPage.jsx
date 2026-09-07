import { useState } from "react";
import { motion } from "framer-motion";

import useChat from "../../hooks/useChat";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import ChatHeader from "./components/ChatHeader";
import ConfirmModal from "../../components/common/ConfirmModal";

const AiChatPage = () => {

    const {
        conversations,
        selectedConversation,
        sending,
        loadConversation,
        sendMessage,
        renameConversation,
        deleteConversation,
        setSelectedConversation,
        loading
    } = useChat();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredConversations =
        conversations?.filter((conversation) =>
            conversation.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) ?? null;

    return (

        <motion.div

            className="
h-screen
bg-gradient-to-br
from-slate-100
via-white
to-blue-50
dark:from-slate-950
dark:via-slate-900
dark:to-black
"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

        >

            <div className="
mx-auto
flex
h-full
max-w-[1700px]
overflow-hidden
rounded-none
md:rounded-2xl
shadow-2xl
border
border-slate-200
dark:border-slate-800
">

                <ChatSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    conversations={filteredConversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={loadConversation}
                    onRenameConversation={renameConversation}
                    onDeleteConversation={(id) => setDeleteId(id)}
                    onNewChat={() => {
                        setSelectedConversation(null);
                        setSidebarOpen(false);
                    }}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="
flex
flex-1
flex-col
bg-white
dark:bg-slate-900
">

                    <ChatHeader

                        onMenuClick={() => setSidebarOpen(true)}

                        conversation={selectedConversation}

                    />

                    <ChatWindow
                        conversation={selectedConversation}
                        sending={sending}
                        loading={loading}
                    />

                    <ChatInput

                        sending={sending}

                        onSend={sendMessage}

                    />

                    <ConfirmModal

                        open={deleteId !== null}

                        title="Delete Conversation"

                        message="This action cannot be undone."

                        confirmText="Delete"

                        cancelText="Cancel"

                        onCancel={() => setDeleteId(null)}

                        onConfirm={async () => {

                            const conversationId = deleteId;

                            setDeleteId(null);

                            await deleteConversation(
                                conversationId
                            );
                        }}

                    />

                </div>

            </div>

        </motion.div>

    );

};

export default AiChatPage;