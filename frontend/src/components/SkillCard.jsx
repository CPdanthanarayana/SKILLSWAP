import React from "react";
import { useNavigate } from "react-router-dom";

function SkillCard({ skillcard, onDelete, currentUser }) {
  const navigate = useNavigate();
  const {
    name,
    description,
    location,
    skillName,
    require,
    email,
    userProfileImage,
  } = skillcard;

  // Use user's profile image or generate one based on their name
  const imageUrl =
    userProfileImage ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      name
    )}`;

  const handleProfileClick = () => {
    const userId = skillcard.user || skillcard.userId;
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  // Create structured email content
  const getEmailContent = () => {
    const subject = `Interest in your skill: ${skillName}`;
    const body = `Hello ${name},

I hope this email finds you well. I found your skill posting on SkillSwap and I'm interested in learning more about "${skillName}".

Skill Details:
- Skill: ${skillName}
- Location: ${location}
- Description: ${description}${
      require
        ? `
- You're looking to learn: ${require}`
        : ""
    }

I would love to connect and discuss:
- How we can arrange skill sharing sessions
- Your availability and preferred meeting format
- Any prerequisites or materials needed${
      require
        ? `
- Potential skill exchange opportunities`
        : ""
    }

Please let me know if you're available for a brief chat or meeting.

Best regards,
[Your Name]
[Your Contact Information]

---
This email was generated through SkillSwap platform.`;

    return { subject, body };
  };

  const handleContactClick = (e) => {
    e.preventDefault();

    const { subject, body } = getEmailContent();

    // Create Gmail compose URL (most reliable method)
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;

    // Open Gmail directly in new tab (this should work reliably)
    try {
      const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");

      if (newWindow) {
        // Gmail opened successfully
        console.log("Gmail opened successfully");
      } else {
        // Popup was blocked, try direct navigation
        console.log("Popup blocked, trying direct navigation");
        window.location.href = gmailUrl;
      }
    } catch (error) {
      console.error("Error opening Gmail:", error);
      // Final fallback - direct navigation
      window.location.href = gmailUrl;
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in to delete skills");
      return;
    }

    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete your "${skillName}" skill?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:5000/api/skills/${skillcard._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete skill");
      }

      // Call the parent component's delete handler
      if (onDelete) {
        onDelete(skillcard._id);
      }

      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert(`Error deleting skill: ${error.message}`);
    }
  };

  // Check if current user owns this skill (compare user IDs)
  const isOwner =
    currentUser && skillcard.user && currentUser._id === skillcard.user;

  return (
    <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition-all flex flex-col text-center h-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 cursor-pointer hover:ring-4 hover:ring-indigo-300 transition-all"
        onClick={handleProfileClick}
        title={`View ${name}'s profile`}
      />
      <h3 className="text-lg font-bold text-indigo-700">{skillName}</h3>
      <p className="mt-2 text-gray-700">{description}</p>

      {require && (
        <p className="mt-2 text-sm text-amber-600 font-semibold">
          Wants to learn: <span className="text-gray-800">{require}</span>
        </p>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Offered by: <strong>{name}</strong>
        <br />
        Location: {location}
      </div>

      <div className="flex-grow"></div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleContactClick}
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 cursor-pointer"
        >
          📧 Contact Me
        </button>

        {isOwner && (
          <button
            onClick={handleDeleteClick}
            className="bg-white-600 text-white py-2 px-3 rounded hover:bg-red-700 cursor-pointer"
            title="Delete this skill"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
