function SkillForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="skillName"
        placeholder="Skill You Offer (e.g., Web Development, Guitar Lessons)"
        value={formData.skillName}
        onChange={onChange}
        required
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="require"
        placeholder="Skill You Want to Learn (e.g., Photography, Spanish)"
        value={formData.require}
        onChange={onChange}
        required
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="description"
        placeholder="Describe your skill and what you're looking for in detail..."
        value={formData.description}
        onChange={onChange}
        required
        rows="4"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="location"
        placeholder="Your Location (e.g., New York, NY)"
        value={formData.location}
        onChange={onChange}
        required
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
      >
        Share My Skill
      </button>
    </form>
  );
}

export default SkillForm;
