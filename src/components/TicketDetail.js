import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 

const MOCK_CURRENT_USER = {
    id: 'user-123',
    role: 'admin', 
    email: 'kammarikavyasree@gmail.com'
};
const MOCK_STATUSES = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Closed' }
];
const MOCK_PRIORITIES = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' }
];
const MOCK_CATEGORIES = [
    { id: 1, name: 'Bug' },
    { id: 2, name: 'Feature Request' },
    { id: 3, name: 'General Inquiry' }
];

const TicketDetail = ({ ticketId }) => {
    const [ticket, setTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { role } = MOCK_CURRENT_USER;
    const isAdmin = role === 'admin';

    useEffect(() => {
        async function fetchTicketData() {
            setLoading(true);
            try {
                
                const { data: ticketData, error: ticketError } = await supabase
                    .from('tickets')
                    .select(`
                        *,
                        status:statuses(id, name),
                        priority:priorities(id, name),
                        category:categories(id, name),
                        creator:users(email)
                    `)
                    .eq('id', ticketId)
                    .single();

                if (ticketError) throw ticketError;
                setTicket(ticketData);

                
                const { data: commentsData, error: commentsError } = await supabase
                    .from('comments')
                    .select(`
                        *,
                        user:users(email)
                    `)
                    .eq('ticket_id', ticketId)
                    .order('created_at', { ascending: true });

                if (commentsError) throw commentsError;
                setComments(commentsData);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || 'Failed to load ticket details.');
            } finally {
                setLoading(false);
            }
        }
        fetchTicketData();
    }, [ticketId]);

    
    const handleFieldUpdate = async (fieldName, newValueId) => {
        if (!ticket) return;

        const dbColumn = `${fieldName.toLowerCase()}_id`;

        if (fieldName === 'status' && !isAdmin) {
            alert("Permission Denied: Only Admins can update ticket status.");
            return;
        }

        const { error: updateError } = await supabase
            .from('tickets')
            .update({ [dbColumn]: newValueId })
            .eq('id', ticketId);

        if (updateError) {
            alert(`Update failed: ${updateError.message}`);
        } else {
            const updatedField = MOCK_PRIORITIES.find(p => p.id === parseInt(newValueId)) || 
                                 MOCK_CATEGORIES.find(c => c.id === parseInt(newValueId)) ||
                                 MOCK_STATUSES.find(s => s.id === parseInt(newValueId));
            
            setTicket(prev => ({
                ...prev,
                [fieldName.toLowerCase()]: updatedField 
            }));
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const { data, error: commentError } = await supabase
            .from('comments')
            .insert({
                ticket_id: ticketId,
                user_id: MOCK_CURRENT_USER.id, 
                content: newComment.trim(),
            })
            .select('*') 
            .single();

        if (commentError) {
            alert(`Comment failed: ${commentError.message}`);
        } else {
        
            const newCommentWithUser = { ...data, user: { email: MOCK_CURRENT_USER.email } };
            setComments([...comments, newCommentWithUser]);
            setNewComment('');
        }
    };

    if (loading) return <div>Loading Ticket #{ticketId}...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!ticket) return <div>Ticket not found.</div>;

    
    const renderUpdateControl = (fieldName, options, currentId, canUpdate) => {
        const currentName = options.find(o => o.id === currentId)?.name || 'N/A';

        if (canUpdate) {
            return (
                <select 
                    value={currentId} 
                    onChange={(e) => handleFieldUpdate(fieldName, e.target.value)}
                >
                    {options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            );
        } else {
            return <span>{currentName} (Read Only)</span>;
        }
    };

    return (
        <div style={styles.container}>
            <h1>Ticket #{ticket.id}: {ticket.title}</h1>
            <p><strong>Created By:</strong> {ticket.creator.email} on {new Date(ticket.created_at).toLocaleDateString()}</p>
            
            <div style={styles.section}>
                <h3>Ticket Details</h3>
                <p><strong>Description:</strong> {ticket.description}</p>
            </div>

            <div style={styles.section}>
                <h3>Update Fields (Your Role: {role.toUpperCase()})</h3>
                <div style={styles.fieldRow}>
                    <label>Status:</label>
                    {renderUpdateControl(
                        'status', 
                        MOCK_STATUSES, 
                        ticket.status.id, 
                        isAdmin 
                    )}
                </div>
                
                <div style={styles.fieldRow}>
                    <label>Priority:</label>
                    {renderUpdateControl(
                        'priority', 
                        MOCK_PRIORITIES, 
                        ticket.priority.id, 
                        isAdmin || role === 'user' 
                    )}
                </div>
                
                <div style={styles.fieldRow}>
                    <label>Category:</label>
                    {renderUpdateControl(
                        'category', 
                        MOCK_CATEGORIES, 
                        ticket.category.id, 
                        isAdmin || role === 'user' 
                    )}
                </div>
            </div>

            <div style={styles.section}>
                <h3>Comments ({comments.length})</h3>
                <div style={styles.commentsList}>
                    {comments.map((comment) => (
                        <div key={comment.id} style={styles.commentItem}>
                            <strong>{comment.user.email}</strong> 
                            <span style={{ fontSize: '0.8em', color: '#666' }}> 
                                - {new Date(comment.created_at).toLocaleTimeString()}
                            </span>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
                
                <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows="3"
                        style={styles.textArea}
                        required
                    />
                    <button type="submit" style={styles.button}>Submit Comment</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px' 
    },
    section: { 
        marginBottom: '20px', 
        padding: '15px', 
        border: '1px solid #eee', 
        borderRadius: '5px' },
    fieldRow: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '10px' },
    commentsList: { 
        maxHeight: '200px', 
        overflowY: 'auto', 
        border: '1px solid #ddd', 
        padding: '10px', 
        marginBottom: '15px' },
    commentItem: { 
        padding: '8px 0', 
        borderBottom: '1px dotted #eee' },
    commentForm: { 
        display: 'flex', 
        flexDirection: 'column' },
    textArea: { 
        padding: '10px', 
        marginBottom: '10px', 
        resize: 'vertical' },
    button: { 
        padding: '10px',
         backgroundColor: '#4CAF50',
          color: 'white', 
          border: 'none',
           borderRadius: '5px',
            cursor: 'pointer' }
};

export default TicketDetail;