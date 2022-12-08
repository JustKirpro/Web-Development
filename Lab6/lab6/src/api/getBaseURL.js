const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

export const getBaseURL = () => {
    return `http://${HOSTNAME}:${PORT}/api/v1/list/`;
}