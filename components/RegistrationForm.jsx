import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { EVENT_OPTIONS } from "../constants/eventOptions";

const RegistrationForm = ({ onClose }) => {
  const [isTeam, setIsTeam] = useState(false);
  const [scale, setScale] = useState("scale-0");
  const [teamGender, setTeamGender] = useState("");
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    age: "",
    collegeName: "",
    state: "",
    city: "",
    event: "",
    teamGender: "",
    Members: [{ name: "", email: "", phoneNumber: "", age: "" }],
  });

  useEffect(() => {
    setScale("scale-100");
  }, []);

  const handleClose = () => {
    setScale("scale-0");
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const newMembers = [...prev.Members];
      newMembers[index] = {
        ...newMembers[index],
        [field]: value,
      };
      return {
        ...prev,
        Members: newMembers,
      };
    });
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      Members: [
        ...prev.Members,
        { name: "", email: "", phoneNumber: "", age: "", gender: "" },
      ],
    }));
  };

  const handleTeamGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      teamGender: gender,
    }));
    setTeamGender(gender);
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phoneNumber",
      "gender",
      "age",
      "collegeName",
      "state",
      "city",
      "event",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field} field.`);
        return false;
      }
    }

    if (!isTeam) {
      const age = parseInt(formData.age);
      if (!age || age > 25) {
        alert("Maximum age limit is 25");
        return false;
      }
    }

    if (isTeam) {
      if (!formData.teamGender) {
        alert("Please select a team gender.");
        return false;
      }
      if (formData.Members.length < 1) {
        alert("Minimum 1 team member required");
        return false;
      }

      for (let i = 0; i < formData.Members.length; i++) {
        if (
          !formData.Members[i].name ||
          !formData.Members[i].email ||
          !formData.Members[i].phoneNumber ||
          !formData.Members[i].age
        ) {
          alert(`Please fill out all team member fields.`);
          return false;
        }
        const age = parseInt(formData.Members[i].age);
        if (!age || age > 25) {
          alert(`Member ${i + 1}: Maximum age limit is 25`);
          return false;
        }
      }
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const tab = isTeam ? 'Team' : 'Individual';

    const memberString = isTeam
      ? formData.Members.map(
          (m, i) => `Member ${i + 1}: ${m.name}, ${m.email}, ${m.phoneNumber}, Age: ${m.age}`
        ).join(' | ')
      : 'N/A';

    const finalData = {
      'Full Name':    formData.fullName,
      'Email':        formData.email,
      'Phone Number': formData.phoneNumber,
      'Gender':       formData.gender,
      'Age':          formData.age,          // ← you added age this year
      'College Name': formData.collegeName,
      'State':        formData.state,
      'City':         formData.city,
      'Event':        formData.event,
      'Team Gender':  isTeam ? formData.teamGender : 'N/A',
      'Members':      memberString,
    };

    const response = await fetch(
      `https://sheetdb.io/api/v1/hbmsb6og4ymoo?sheet=${tab}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: finalData }),
      }
    );

    if (response.ok) {
      alert('Registration Successful!');
      handleClose();
    } else {
      const err = await response.json();
      console.error('SheetDB error:', err);
      alert('Registration Failed!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  const inputStyles =
    "w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-black/50 border border-orange-400/40 text-orange-400 placeholder-orange-400/50 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:bg-black/70 outline-none transition-all duration-300 cursor-pointer rounded-sm text-sm sm:text-base";

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-40">
      <div className="fixed inset-0 bg-black opacity-80" onClick={handleClose}>
        <p className="absolute bottom-4 w-full px-4 text-white text-center font-light italic font-sans text-xs sm:text-sm md:text-base">
          Click anywhere on the screen to close this window.
        </p>
      </div>

      <div
        className={`relative w-11/12 sm:max-w-xl md:max-w-2xl lg:max-w-4xl transform transition-all duration-300 ${scale}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-500/20 blur-xl md:blur-2xl rounded-lg pointer-events-none"></div>

        <div
          ref={formRef}
          className="relative bg-neutral-950/80 backdrop-blur-md border border-orange-400/30 rounded-lg shadow-2xl shadow-orange-500/10 mx-auto"
        >
          {/* CSS Only Corners */}
          <div className="absolute -top-px -left-px w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-orange-400 rounded-tl-lg z-10 pointer-events-none"></div>
          <div className="absolute -top-px -right-px w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-orange-400 rounded-tr-lg z-10 pointer-events-none"></div>
          <div className="absolute -bottom-px -right-px w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-orange-400 rounded-br-lg z-10 pointer-events-none"></div>
          <div className="absolute -bottom-px -left-px w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-orange-400 rounded-bl-lg z-10 pointer-events-none"></div>

          {/* Header */}
          <div className="p-4 sm:p-6 flex justify-between items-center border-b border-orange-400/30">
            <div className="flex space-x-2 sm:space-x-4">
              <button
                onClick={() => setIsTeam(false)}
                className={`relative cursor-pointer px-4 sm:px-6 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base font-medium transition-all duration-300 ${
                  !isTeam
                    ? "text-black bg-orange-400 shadow-lg shadow-orange-500/50"
                    : "text-orange-400 bg-black/60 hover:bg-black/80"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setIsTeam(true)}
                className={`relative cursor-pointer px-4 sm:px-6 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base font-medium transition-all duration-300 ${
                  isTeam
                    ? "text-black bg-orange-400 shadow-lg shadow-orange-500/50"
                    : "text-orange-400 bg-black/60 hover:bg-black/80"
                }`}
              >
                Team
              </button>
            </div>
            <button
              onClick={handleClose}
              className="text-orange-400 hover:text-orange-200 text-xl sm:text-2xl cursor-pointer z-20 p-2 leading-none transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[75vh] md:max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-500/30 hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/50">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                
                <div className="space-y-4">
                  <h3 className="text-orange-400 text-base sm:text-lg font-semibold mb-2 sm:mb-4 tracking-wide">
                    Personal Details
                  </h3>
                  
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className={inputStyles}
                      onChange={handleInputChange}
                      required={!isTeam}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={inputStyles}
                      onChange={handleInputChange}
                      required={!isTeam}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className={inputStyles}
                        onChange={handleInputChange}
                        required={!isTeam}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age (max 25)"
                        className={inputStyles}
                        onChange={handleInputChange}
                        min="1"
                        max="25"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="gender"
                      className={inputStyles}
                      onChange={handleInputChange}
                      required={!isTeam}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Gender
                      </option>
                      <option value="male" className="bg-neutral-900">
                        Male
                      </option>
                      <option value="female" className="bg-neutral-900">
                        Female
                      </option>
                      <option value="other" className="bg-neutral-900">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="collegeName"
                      placeholder="College Name"
                      className={inputStyles}
                      onChange={handleInputChange}
                      required={!isTeam}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className={inputStyles}
                        onChange={handleInputChange}
                        required={!isTeam}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className={inputStyles}
                        onChange={handleInputChange}
                        required={!isTeam}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-orange-400 text-base sm:text-lg font-semibold mb-2 sm:mb-4 tracking-wide">
                      Select Events
                    </h3>
                    <select
                      name="event"
                      className={inputStyles}
                      onChange={handleInputChange}
                      required={!isTeam}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Event
                      </option>
                      {EVENT_OPTIONS.map((category) => (
                        <optgroup
                          key={category.category}
                          label={category.category}
                          className="bg-neutral-950 text-neutral-300 font-semibold"
                        >
                          {category.events.map((event) => (
                            <option
                              key={event}
                              value={`${category.category} - ${event}`}
                              className="bg-neutral-900 text-orange-400 font-normal"
                            >
                              {event}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {isTeam && (
                    <div className="space-y-4 border-t border-orange-400/30 pt-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h3 className="text-orange-400 text-base sm:text-lg font-semibold">
                          Team Members ({formData.Members.length})
                        </h3>
                        <button
                          type="button"
                          onClick={addMember}
                          className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-orange-400 border border-orange-400/50 rounded-sm hover:bg-orange-400/10 transition-colors disabled:opacity-50"
                          disabled={formData.Members.length >= 50}
                        >
                          Add Member (+)
                        </button>
                      </div>

                      <div className="grid grid-cols-1 min-[450px]:grid-cols-3 gap-2 sm:gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() => handleTeamGenderChange("male")}
                          className={`px-3 py-2 text-sm sm:text-base rounded-sm transition-all duration-300 ${
                            teamGender === "male"
                              ? "bg-orange-400 text-black font-medium shadow-md shadow-orange-500/40"
                              : "text-orange-400 border border-orange-400/50 hover:bg-orange-400/10"
                          }`}
                        >
                          Male Team
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeamGenderChange("female")}
                          className={`px-3 py-2 text-sm sm:text-base rounded-sm transition-all duration-300 ${
                            teamGender === "female"
                              ? "bg-orange-400 text-black font-medium shadow-md shadow-orange-500/40"
                              : "text-orange-400 border border-orange-400/50 hover:bg-orange-400/10"
                          }`}
                        >
                          Female Team
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTeamGenderChange("mixed")}
                          className={`px-3 py-2 text-sm sm:text-base rounded-sm transition-all duration-300 ${
                            teamGender === "mixed"
                              ? "bg-orange-400 text-black font-medium shadow-md shadow-orange-500/40"
                              : "text-orange-400 border border-orange-400/50 hover:bg-orange-400/10"
                          }`}
                        >
                          Mixed Team
                        </button>
                      </div>

                      <div className="space-y-6 sm:space-y-4">
                        {formData.Members.map((_, index) => (
                          <div 
                            key={index} 
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-6 sm:pb-0 border-b border-orange-400/20 sm:border-0 last:border-0"
                          >
                            <input
                              type="text"
                              placeholder={`Member ${index + 1} Name`}
                              className={inputStyles}
                              onChange={(e) =>
                                handleMemberChange(index, "name", e.target.value)
                              }
                              required
                            />
                            <input
                              type="email"
                              placeholder={`Member ${index + 1} Email`}
                              className={inputStyles}
                              onChange={(e) =>
                                handleMemberChange(index, "email", e.target.value)
                              }
                              required
                            />
                            <input
                              type="tel"
                              placeholder={`Member ${index + 1} Phone`}
                              className={inputStyles}
                              onChange={(e) =>
                                handleMemberChange(
                                  index,
                                  "phoneNumber",
                                  e.target.value
                                )
                              }
                              required
                            />
                            <input
                              type="number"
                              placeholder={`Age (max 25)`}
                              className={inputStyles}
                              onChange={(e) =>
                                handleMemberChange(index, "age", e.target.value)
                              }
                              min="1"
                              max="25"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center w-full pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-orange-400/30 text-white">
                <Button text="SUBMIT" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;