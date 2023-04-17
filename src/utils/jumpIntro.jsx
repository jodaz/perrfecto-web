import vars from '../vars';

const jumpIntro = () => {
    if (!localStorage.getItem(vars.intro)) {
        localStorage.setItem(vars.intro, true)
    }
}

export default jumpIntro;
