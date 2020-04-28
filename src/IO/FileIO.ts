import YAML from 'yaml'
import {Shapes} from "../shapes/Shapes";
import {Pair, YAMLMap, YAMLSeq} from "yaml/types";

class FileIO {
    // https://eemeli.org/yaml/#working-with-anchors
    static Load() {
        let kaas = YAML.parse('[ true, false, maybe, null ]\n')
        const src = '[{ a: A }, { b: B }]'
        const doc = YAML.parseDocument(src)
        const {anchors, contents} = doc
        console.log(kaas)
    }

    static Save() {
        const doc = new YAML.Document()
        doc.contents = new YAMLSeq();

        Shapes.getShapes().shapeArray.forEach(
            (a) => {
                // @ts-ignore
                doc.contents.items.push(
                    new Pair(a.getType(), `${a.getPosition().x}, ${a.getPosition().y}`)
                )
            }
        );


        console.log(String(doc));
    }
}

export {FileIO}