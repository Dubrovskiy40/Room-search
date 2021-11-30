import './styles/index.scss'
import $ from "jquery";
// import 'bootstrap';

const userStack = {
    language: 'JavaScript',
    framework: 'React'
}

const user = {
    name: 'Anatoliy',
    age: '36',
    ...userStack
}

$('.block').html('jQuery is working');

console.log(user)