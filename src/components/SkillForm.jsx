function SkillForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="skillName"
        placeholder="Skill You Offer"
        value={formData.skillName}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="require"
        placeholder="Skill You Want to Learn"
        value={formData.require}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Describe your offer or goal"
        value={formData.description}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Your Location"
        value={formData.location}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="image"
        placeholder="Profile Image URL (optional)"
        value={formData.image}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}

export default SkillForm;
