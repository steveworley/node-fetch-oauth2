/*global fetch */
import fetch from 'cross-fetch'

export default function fetchWithConfig(config) {
    return fetch(config.uri, config.opts);
}
