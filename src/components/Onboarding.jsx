import { useState } from 'react';
import { FiArrowRight, FiCheck, FiUpload } from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const DOMAINS = ["Computer Science", "Commerce", "Electronics", "Mechanical", "Arts"];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  const AVATARS = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=7",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await completeOnboarding(domain, avatar, bio);
      navigate('/profile'); // Redirect to profile after completion
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Progress Bar */}
        <div className="flex h-2 bg-gray-200">
          {[1, 2, 3].map((stepNumber) => (
            <div 
              key={stepNumber}
              className={`h-full transition-all duration-300 ${
                step >= stepNumber ? "bg-green-500" : "bg-gray-300"
              }`}
              style={{ width: "33.33%" }}
            />
          ))}
        </div>

        {/* Step 1: Domain Selection */}
        {step === 1 && (
          <div className="p-6 space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-center text-gray-800">Choose Your Domain</h1>
            <div className="space-y-3">
              {DOMAINS.map((item) => (
                <button
                  key={item}
                  onClick={() => setDomain(item)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    domain === item
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {domain === item && (
                      <FiCheck className="mr-2 text-green-500" />
                    )}
                    <span className="truncate">{item}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => domain && setStep(2)}
              disabled={!domain}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                domain
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next <FiArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 2: Avatar Selection */}
        {step === 2 && (
          <div className="p-6 space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-center text-gray-800">Pick an Avatar</h1>
            <div className="grid grid-cols-2 gap-4">
              {AVATARS.map((url) => (
                <button
                  key={url}
                  onClick={() => setAvatar(url)}
                  className={`p-2 rounded-full border-2 transition-colors ${
                    avatar === url
                      ? "border-green-500"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img
                    src={url}
                    alt="Avatar"
                    className="w-full h-auto rounded-full aspect-square object-cover"
                  />
                </button>
              ))}
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-full hover:border-green-500 cursor-pointer transition-colors">
                <FiUpload className="text-gray-400 mb-2" size={20} />
                <span className="text-xs text-gray-500">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setAvatar(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => avatar && setStep(3)}
                disabled={!avatar}
                className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
                  avatar
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Bio */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-center text-gray-800">Introduce Yourself</h1>
            <div>
              <label className="block text-gray-700 mb-2">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="E.g., CSE student passionate about AI..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[120px] transition-colors"
                required
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {bio.length}/200 characters
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                  isSubmitting ? "bg-green-500" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Completing...
                  </span>
                ) : (
                  "Complete Setup"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;