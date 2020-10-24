import Image from '../models/Image'
import {app} from "../util/config";
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${app.backend}/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}
