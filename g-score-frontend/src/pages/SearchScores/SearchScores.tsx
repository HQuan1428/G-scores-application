import PageMeta from "../../components/common/PageMeta";
import { useFormInput } from "../../hooks/useFormInput";
import studentServices from "../../services/studentService"



export default function SearchScores() {

  const apiFetcher = async (regNum: string) => {
    const response = await studentServices.getScore(regNum);
    return response;
  };

  const {
    registrationNumber,
    setRegistrationNumber,
    scores,
    inputRef,
    isLoading,
    error,
    handleSubmit,
    handleInputClick,
  } = useFormInput(apiFetcher);
  
    return (
      <>
        <PageMeta
          title="Search Scores"
          description="I don't know what to write either"
        />
        <div className="p-8 min-h-screen">
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 ">User Registration</h2>

            <form onSubmit={handleSubmit} >
              <label htmlFor="registration-number">Registration Number</label>
              <div className="flex items-center mt-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter registration number"
                  id="registration-number"
                  name="sbd"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-5 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 xl:w-[430px]"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  onClick={handleInputClick}
                  disabled={isLoading}
                  required
                />

                <button
                  type="submit" // Nên là type="submit" nếu nó dùng để gửi form
                  className="h-11 ml-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Detailed Scores</h2>
            {isLoading && <p className="text-gray-600">Loading scores...</p>}
            {!isLoading && scores ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(scores).map(([subject, score]) => (
                  <div key={subject} className="flex justify-between py-1 border-b border-gray-200">
                    <span className="font-bold capitalize">
                      {subject.replace(/_/g, " ")}:
                    </span>
                    <span>{score}</span>
                  </div>
                ))}
              </div>
            ) : (!isLoading && !error && (
              <p className=" font-medium text-gray-600">
                Enter a registration number and click Submit to view scores.
              </p>
            ))}
          </div>
        </div>
      </>
  );
}
