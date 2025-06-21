import api from "./apiClient";

const studentServices = {
    getScore: async (regNum: string) => {
        try {
            const response = await api.post('/score', { "registration_number": regNum });
            return response.data;
        } catch (error: any) {
            console.error("Error fetching score:", error);
            throw new Error(error?.response?.data?.message || "Failed to fetch score");
        }
    },

    getStatistics: async () => {
        try {
            const response = await api.get('/statistics');
            return response.data;
        } catch (error: any) {
            console.error("Error fetching statistics:", error);
            throw new Error(error?.response?.data?.message || "Failed to fetch statistics");
        }
    },

    getTopTen: async () => {
        try {
            const response = await api.get('/top-ten');
            return response.data;
        } catch (error: any) {
            console.error("Error fetching top ten:", error);
            throw new Error(error?.response?.data?.message || "Failed to fetch top ten");
        }
    },
}

export default studentServices;
