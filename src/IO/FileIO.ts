import YAML from 'yaml'

class FileIO {
    // https://eemeli.org/yaml/#working-with-anchors
    static Saves() {

    }

    static Load() {
        let kaas = YAML.parse('[ true, false, maybe, null ]\n')
        console.log(kaas)
    }

    static Save() {
        let kaas = YAML.parse('[ true, false, maybe, null ]\n')
        console.log(kaas)
        const src = '[{ a: A }, { b: B }]'
        const doc = YAML.parseDocument(src)
        const { anchors, contents } = doc
        const [a, b] = contents?.
        anchors.setAnchor(a.items[0].value) // 'a1'
        anchors.setAnchor(b.items[0].value) // 'a2'
        anchors.setAnchor(null, 'a1') // 'a1'
        anchors.getName(a) // undefined
        anchors.getNode('a2')
// { value: 'B', range: [ 16, 18 ], type: 'PLAIN' }
        String(doc)
        return function (p1: React.MouseEvent<HTMLButtonElement>) {
        };
    }
}

export {FileIO}