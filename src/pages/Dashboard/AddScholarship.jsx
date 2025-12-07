import React from 'react';

const AddScholarship = () => {
  return (
    <div>
      <form action="">
        <fieldset className="fieldset">
          {/* Scholarship name */}
          <label className="label">Scholarship Name</label>
          <input type="text" className="input" placeholder="Scholarship Name" />
          {/* University Name */}
          <label className="label">University Name</label>
          <input type="text" className="input" placeholder="University Name" />
          {/* Image */}
          <label className="label">Image</label>
          <input type="text" className="input" placeholder="Image" />
          {/* Country */}
          <label className="label">Country</label>
          <input type="text" className="input" placeholder="Country" />
          {/* City */}
          <label className="label">City</label>
          <input type="text" className="input" placeholder="City" />
          {/* World Rank */}
          <label className="label">World Rank</label>
          <input type="text" className="input" placeholder="World Rank" />
          {/* Subject Category */}
          <label className="label">Subject Category</label>
          <input type="text" className="input" placeholder="Subject Category" />
          {/* Scholarship Category */}
          <label className="label">Scholarship Category</label>
          <input type="text" className="input" placeholder="Scholarship Category" />
          {/* Degree */}
          <label className="label">Degree</label>
          <input type="text" className="input" placeholder="Degree" />
          {/* Tuition Fees */}
          <label className="label">Tuition Fees</label>
          <input type="text" className="input" placeholder="Tuition Fees" />

          <button className="btn btn-neutral mt-4">Add Scholarship</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddScholarship;