interface ICommand {
    execute() :boolean;
    undo(): void;
}