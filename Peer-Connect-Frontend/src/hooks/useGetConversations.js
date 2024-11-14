const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/conversations',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConversations(data);
      } catch (err) {
        console.error(err);
      }
    };

    getConversations();
  }, []);

  return <div>useGetConversations</div>;
};

export default useGetConversations;
