import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [subscriptions, setSubscriptions] = useState([]);

  const [formData, setFormData] = useState({
    user_email: "",
    plan_name: "",
    start_date: "",
    end_date: "",
    monthly_cost: "",
    status: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const res = await axios.get("http://localhost:5000/subscriptions");
    setSubscriptions(res.data);
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const openCreate = () => {
    setEditId(null);
    setFormData({
      user_email:"",
      plan_name:"",
      start_date:"",
      end_date:"",
      monthly_cost:"",
      status:""
    });
  };

  const openEdit = (sub) => {
    setEditId(sub.subscription_id);
    setFormData(sub);
  };

  const saveData = async () => {

    if(editId){
      await axios.put("http://localhost:5000/subscriptions/"+editId,formData);
    }else{
      await axios.post("http://localhost:5000/subscriptions",formData);
    }

    fetchSubscriptions();
  };

  const deleteSubscription = async (id) => {
    await axios.delete("http://localhost:5000/subscriptions/"+id);
    fetchSubscriptions();
  };

  return (

<div className="container mt-4">

<h2>Subscription Management System</h2>

<button
className="btn btn-primary"
data-bs-toggle="modal"
data-bs-target="#subscriptionModal"
onClick={openCreate}
>
Create Subscription
</button>

<br/><br/>

<table className="table table-bordered">

<thead>
<tr>
<th>Email</th>
<th>Plan</th>
<th>Start</th>
<th>End</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{subscriptions.map((sub)=>(
<tr key={sub.subscription_id}>

<td>{sub.user_email}</td>
<td>{sub.plan_name}</td>
<td>{sub.start_date}</td>
<td>{sub.end_date}</td>
<td>{sub.status}</td>

<td>

<button
className="btn btn-warning btn-sm"
data-bs-toggle="modal"
data-bs-target="#subscriptionModal"
onClick={()=>openEdit(sub)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm ms-2"
onClick={()=>deleteSubscription(sub.subscription_id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>


{/* POPUP MODAL */}

<div className="modal fade" id="subscriptionModal">

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">
<h5 className="modal-title">
{editId ? "Edit Subscription" : "Create Subscription"}
</h5>
<button className="btn-close" data-bs-dismiss="modal"></button>
</div>

<div className="modal-body">

<input
className="form-control mb-2"
name="user_email"
placeholder="Email"
value={formData.user_email}
onChange={handleChange}
/>

<input
className="form-control mb-2"
name="plan_name"
placeholder="Plan Name"
value={formData.plan_name}
onChange={handleChange}
/>

<input
type="date"
className="form-control mb-2"
name="start_date"
value={formData.start_date}
onChange={handleChange}
/>

<input
type="date"
className="form-control mb-2"
name="end_date"
value={formData.end_date}
onChange={handleChange}
/>

<input
type="number"
className="form-control mb-2"
name="monthly_cost"
placeholder="Cost"
value={formData.monthly_cost}
onChange={handleChange}
/>

<input
className="form-control"
name="status"
placeholder="Active / Expired / Cancelled"
value={formData.status}
onChange={handleChange}
/>

</div>

<div className="modal-footer">

<button
className="btn btn-success"
data-bs-dismiss="modal"
onClick={saveData}
>
Save
</button>

<button
className="btn btn-secondary"
data-bs-dismiss="modal"
>
Close
</button>

</div>

</div>

</div>

</div>

</div>

  );

}

export default App;