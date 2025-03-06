document.addEventListener('DOMContentLoaded', function() {
    const topics = new Set();
    const allPapers = document.querySelectorAll('.paper-item');
    
    // 收集所有主题
    document.querySelectorAll('.topic-tag').forEach(tag => {
        topics.add(tag.textContent);
        tag.addEventListener('click', function() {
            filterByTopic(this.textContent);
        });
    });
    
    function filterByTopic(topic) {
        allPapers.forEach(paper => {
            const paperTopics = paper.querySelectorAll('.topic-tag');
            let shouldShow = false;
            paperTopics.forEach(t => {
                if (t.textContent === topic) {
                    shouldShow = true;
                }
            });
            paper.style.display = shouldShow ? 'block' : 'none';
        });
    }
});