import {
Clock3,
CheckCircle2
} from "lucide-react";

const ActivityItem = ({
title
}) => {

return (

<div
className="
flex
items-center
gap-4
rounded-2xl
bg-slate-50
p-4
dark:bg-slate-800
"
>

<CheckCircle2
className="text-green-500"
size={22}
/>

<div>

<h4 className="font-semibold dark:text-white">
{title}
</h4>

<p
className="
mt-1
flex
items-center
gap-2
text-sm
text-slate-500
"
>

<Clock3 size={14}/>

Recently

</p>

</div>

</div>

);

};

export default ActivityItem;