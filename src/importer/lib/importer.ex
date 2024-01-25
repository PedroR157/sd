defmodule SD.XML do
  defmodule SD.DB.Schema do
    use Ecto.Schema

    schema "children_OBS" do
      field :uuid, :string
      field :address, :string
      field :indicator, :string
      field :panel, :string
      field :unit, :string
      field :stub_name, :string
      field :year, :string
      field :age, :string
      field :estimate, :string
      field :se, :string

      timestamps()
    end

    def changeset(schema, attrs) do
      schema
      |> cast(attrs, ~w(
        uuid
        address
        indicator
        panel
        unit
        stub_name
        year
        age
        estimate
        se
      ))
      |> validate_required(~w(
        uuid
        address
        indicator
        panel
        unit
        stub_name
        year
        age
        estimate
        se
      ))
    end

  defmodule SD.DB.Context do
    alias SD.DB.{Schema, Repo}

    def insert_data(attrs) do
      Schema.changeset(%Schema{}, attrs)
      |> Schema.validate_required([
         :uuid,
         :address,
         :indicator,
         :panel,
         :unit,
         :stub_name,
         :year,
         :age,
         :estimate,
         :se
      ]) # Add all required fields
      |> Repo.insert()
    end
  end

  end



  import SweetXml
  alias SD.DB.Context

  def list do
    IO.puts("Listing all available XML files!")
    case File.ls("../../../docker/volumes/importer/rows.xml") do
      {:ok, files} ->
        files
        |> Enum.filter(&String.ends_with?(&1, ".xml"))
        |> Enum.each(&process_file/1)
      {:error, reason} ->
        IO.puts("Error accessing data: #{reason}")
    end
  end

  defp process_file(rows) do
    IO.puts("Processing file: #{rows}")
    file_path = Path.join("../../../docker/volumes/importer/rows.xml", rows)

    file_path
    |> File.read!()
    |> parse_xml()
  end

  defp parse_xml(xml_content) do
    IO.puts("XML Content of the file: \n#{xml_content}")
    |>xpath(
      ~x"/response/row/row",
      uuid: ~x"@_uuid",
      address: ~x"@_address",
      indicator: ~x"indicator/text()",
      panel: ~x"panel/text()",
      unit: ~x"unit/text()",
      stub_name: ~x"stub_name/text()",
      year: ~x"year/text()",
      age: ~x"age/text()",
      estimate: ~x"estimate/text()",
      se: ~x"se/text()"
      )

    |>Enum.each(&Context.insert_data/1)

  end

  defp insert_data(row) do
    attrs = %{
      uuid: row[:uuid],
       address: row[:address],
       indicator: row[:indicator],
       panel: row[:panel],
       unit: row[:unit],
       stub_name: row[:stub_name],
       year: row[:year],
       age: row[:age],
       estimate: row[:estimate],
       se: row[:se]
    }

    IO.puts("Inserting data into the database: #{inspect(attrs)}")
    Context.insert_data(attrs)
  end

  defmodule SD.Importer.Application do
    defmodule SD.Importer.Supervisor do
      use Supervisor

      def start_link(_args) do
        Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
      end

      def init(:ok) do
        children = [
          {SD.XML, ["../../../docker/volumes/importer/rows.xml"]},
        ]

        Supervisor.start_link(children, strategy: :one_for_one)
      end
    end

    use Application
    alias SD.Importer.Supervisor

    def start(_type, _args) do

      children = [
        Supervisor.child_spec(SD.Importer.Supervisor, [])
      ]

      opts = [strategy: :one_for_one, name: SD.Importer.Supervisor]
      Supervisor.start_link(children, opts)
      :ok
    end
  end

end
