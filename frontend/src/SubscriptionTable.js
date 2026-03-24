import React from "react";

/* 👇 PASTE FUNCTION HERE */
function getRemainingDays(endDate){

const today = new Date();
const end = new Date(endDate);

const diff = end - today;

return Math.ceil(diff/(1000*60*60*24));

}

const SubscriptionTable = ({subscriptions}) => {

return(

<table border="1">

<thead>
<tr>
<th>Email</th>
<th>Plan</th>
<th>Start Date</th>
<th>End Date</th>
<th>Remaining Days</th>
</tr>
</thead>

<tbody>

{subscriptions.map((sub)=>{

const remainingDays = getRemainingDays(sub.end_date);

return(
<tr key={sub.subscription_id}>
<td>{sub.user_email}</td>
<td>{sub.plan_name}</td>
<td>{sub.start_date}</td>
<td>{sub.end_date}</td>

{/* 👇 DISPLAY HERE */}
<td>{remainingDays}</td>

</tr>
)

})}

</tbody>

</table>

)

}

export default SubscriptionTable;