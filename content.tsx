import { useMessage } from "@plasmohq/messaging/hook"
import { useState } from "react";

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

const removeVowels = (text: string): string => {
    return text.split("").filter(char => !VOWELS.has(char.toLowerCase())).join("");
}

const disemvowel = (node: Node, ancestors: number[], lookup: Map<string, string>) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const nodeId = ancestors.join(".");
        if (!lookup.has(nodeId)) {
            lookup.set(nodeId, node.textContent);
        }
        node.textContent = removeVowels(node.textContent);
    } else {
        node.childNodes.forEach((child, key) => disemvowel(child, [...ancestors, key], lookup));
    }
};

const reset = (node: Node, ancestors: number[], lookup: Map<string, string>) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const nodeId = ancestors.join(".");
        node.textContent = lookup.get(nodeId) ?? "";
    } else {
        node.childNodes.forEach((child, key) => reset(child, [...ancestors, key], lookup));
    }
}

const Disemvowel = () => {
    const [lookup, setLookup] = useState<Map<string, string>>(new Map<string, string>());
    useMessage<string, string>(async (req, res) => {
        const {name} = req;
        if (name === "disemvowel") {
            disemvowel(document.body, [], lookup);
            setLookup(lookup);
            res.send("disemvoweled");
        } else if (name === "reset") {
            if (lookup !== null) {
                reset(document.body, [], lookup);
                res.send("reset");
            }
        }
    })
}

export default Disemvowel;