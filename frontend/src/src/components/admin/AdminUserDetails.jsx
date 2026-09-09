const AdminUserDetails = ({ user }) => {
  const stats = [
    ["Conversations", user.conversations], ["Messages", user.messages], ["Notes", user.notes], ["Quizzes", user.quizzes],
    ["Quiz Attempts", user.quizAttempts], ["Resume Reviews", user.resumeReviews], ["Roadmaps", user.roadmaps], ["Roadmap Steps", user.roadmapSteps], ["Completed Steps", user.completedRoadmapSteps], ["Notifications", user.notifications],
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl font-bold text-primary">
            {user.profileImageUrl ? <img src={user.profileImageUrl} alt="" className="h-full w-full object-cover" /> : `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
          </div>
          <div><h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2><p className="mt-1 text-sm text-slate-500">{user.email}</p><p className="mt-2 text-xs text-slate-500">{user.role} · {user.accountStatus} · {user.emailVerified ? "Email verified" : "Email not verified"}</p></div>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value ?? 0}</p></div>)}
      </section>
    </div>
  );
};

export default AdminUserDetails;
