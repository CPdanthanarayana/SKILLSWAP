import React from "react";

function SkillCard({ skillcard }) {
  const { name, description, location, skillName, image, require, email } =
    skillcard;

  const imageUrl = image
    ? image
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

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

  return (
    <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition-all flex flex-col text-center h-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
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

      <button
        onClick={handleContactClick}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 inline-block cursor-pointer"
      >
        📧 Contact Me
      </button>
    </div>
  );
}

export default SkillCard;
