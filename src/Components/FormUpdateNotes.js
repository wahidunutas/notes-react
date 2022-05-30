const FormUpdate = ({ setValues, values }) => {
    return (
        <div className="app-FormUpdate">
            <input
                type="text"
                id="title"
                placeholder="Note Title"
                value={values.title}
                onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
            <textarea
                id="body"
                placeholder="Write your note here..."
                value={values.body}
                onChange={(e) => setValues({ ...values, body: e.target.value })}
            />
        </div>
    );
};

export default FormUpdate;
