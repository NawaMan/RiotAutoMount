(function() {
    document.addEventListener("DOMContentLoaded", function() {
        document.body.addEventListener('DOMNodeInserted',function(e) {
            var node = e.target
            if (node.nodeType != 1) // Not an element
                return
            if (node._tag)  // Already mount
                return
            
            if (!(node instanceof HTMLUnknownElement) &&
                !node.getAttribute('data-is') &&
                !(node.tagName && node.tagName.match(/.+-.+/)))
                return
            
            var parent = node
            while (parent != document.body) {
                if (parent._tag) {
                    setTimeout(function() {
                        // Force mount if not yet mount after a while.
                        // This is the case for when the parent is already added long before the node is added.
                        if (!node._tag)
                            riot.mount(node)
                    }, 100)
                    return
                }
                parent = parent.parentNode
                if (!parent)
                    return
            }

            try { riot.mount(node) }
            catch(e) {
                console.error('Fail to mount: Not valid riot tag.');
            }
        }, false)
        riot.mount('*')
    });
})()