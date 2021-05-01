const Arguments = {
    processArgument(args){
        if(!args){
            throw new Error('No arguments provided.');
        } else {
            return process.argv.slice(2);
        }
    }
}

module.exports = Arguments;